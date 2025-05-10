import { Droppable, Draggable } from "@hello-pangea/dnd";
import AddTaskComponent from "./addTask";
import { useState } from "react";
import { useRemoveStageMutation, useUpdateStageMutation } from "@/services/stages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";
import Button from "@/components/shared/button";

interface IProps {
    stage: any;
}

const ColumnComponent = ({ stage }: IProps) => {
    const [isTitleEditable, setIsTitleEditable] = useState(false);
    const [title, setTitle] = useState(stage.title);
    const [updateStage] = useUpdateStageMutation();
    const [removeStage, { isLoading }] = useRemoveStageMutation();

    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleSubmit() {
        setIsTitleEditable(false);
        updateStage({ id: stage?.id, title });
    }

    async function handleDelete(stageId: string) {
        if (stage?.tasks?.length) {
            return alert("Unable to delete stage. Please remove all tasks before deleting the stage.")
        }
        await removeStage(stageId);
    }

    function openModal(task: any) {
        setSelectedTask(task);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedTask(null);
    }

    return (
        <Droppable droppableId={stage.id} direction="vertical" type="task">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="flex items-center justify-between mb-2">
                        {!isTitleEditable ? (
                            <h2
                                className="font-semibold text-sm cursor-pointer text-white"
                                onClick={() => setIsTitleEditable(true)}
                            >
                                {title}
                            </h2>
                        ) : (
                            <input
                                type="text"
                                value={title}
                                autoFocus
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={() => handleSubmit()}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSubmit();
                                }}
                                className="border p-1 rounded w-full"
                            />
                        )}
                        <Button
                            loading={isLoading}
                            onClick={() => handleDelete(stage.id)}
                            className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                    {stage.tasks.map((task: any, index: number) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-2 my-2 text-sm bg-gray-800 rounded shadow cursor-pointer"
                                    style={{ ...provided.draggableProps.style, zIndex: 9999 }}
                                    onClick={() => openModal(task)}
                                >
                                    <h1 className="text-white">{task?.title}</h1>
                                    <p className="text-gray-400 text-xs">{task.description}</p>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {!stage.tasks.length ? <div className="text-white text-sm py-4">No Tasks</div> : null}
                    {provided.placeholder}
                    <AddTaskComponent stageId={stage.id} />
                    {isModalOpen && selectedTask && (
                        <Modal task={selectedTask} onClose={() => closeModal()} />
                    )}
                </div>
            )}
        </Droppable>
    );
};

export default ColumnComponent;