import { useGetStagesByBoardIdQuery, useUpdateOrderStagesMutation } from "@/services/stages";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddStageComponent from "./addStage";
import ColumnComponent from "./column";
import { IUpdateOrderTasks } from "@/types/tasks";
import { useUpdateOrderTasksMutation } from "@/services/tasks";
import { useGetBoardByIdQuery } from "@/services/boards";
interface Task {
    id: string;
    title: string;
}

interface Stage {
    id: string;
    title: string;
    tasks: Task[];
}

const BoardViewComponent: React.FC = () => {
    const [updateOrderStages] = useUpdateOrderStagesMutation()
    const [updateOrderTasks] = useUpdateOrderTasksMutation()

    const router = useRouter();
    const { id } = router.query;
    const [stages, setStages] = useState<Stage[]>([]);
    const { data: stagesData } = useGetStagesByBoardIdQuery(id, { skip: router.isFallback });
    const { data: boardsData } = useGetBoardByIdQuery(id, { skip: router.isFallback })

    useEffect(() => {
        if (boardsData?.imageUrl?.length) {
            const appElement = document.getElementById("main-app");
            if (appElement) {
                appElement.style.backgroundImage = `url('${boardsData?.imageUrl}')`;
                appElement.style.backgroundSize = "cover";
                appElement.style.backgroundPosition = "center";
            }
        }
    }, [boardsData?.imageUrl]);



    useEffect(() => {
        if (Array.isArray(stagesData)) {
            const formatted = stagesData.map((col: any) => ({
                ...col,
                tasks: [...col?.tasks || []]?.sort((a: any, b: any) => a.order - b.order),
            }));
            setStages(formatted);
        }
    }, [stagesData]);


    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Make a deep copy of stages
        let updatedStages = structuredClone(stages);

        // Handle stage (column) reordering
        if (type === "stage") {
            const [movedStage] = updatedStages.splice(source.index, 1);
            updatedStages.splice(destination.index, 0, movedStage);

            updatedStages = updatedStages.map((stage, index) => ({
                ...stage,
                order: index,
            }));

            setStages(updatedStages);

            const columnIds = updatedStages?.map(col => col?.id)
            updateOrderStages(columnIds);
        }

        // Handle task reordering
        else if (type === "task") {
            const sourceStage = updatedStages.find(stage => stage.id === source.droppableId);
            const destinationStage = updatedStages.find(stage => stage.id === destination.droppableId);

            if (!sourceStage || !destinationStage) return;

            // Deep clone tasks
            sourceStage.tasks = structuredClone(sourceStage.tasks);
            destinationStage.tasks = structuredClone(destinationStage.tasks);

            const [movedTask] = sourceStage.tasks.splice(source.index, 1);
            destinationStage.tasks.splice(destination.index, 0, movedTask);

            sourceStage.tasks.forEach((task: any, index) => (task.order = index));
            destinationStage.tasks.forEach((task: any, index) => (task.order = index));

            setStages(updatedStages);

            const data: IUpdateOrderTasks = {
                stageId: destinationStage.id,
                taskIds: destinationStage?.tasks?.map((dest) => dest?.id)
            }
            updateOrderTasks(data)
        }
    };


    return (
        <div className="flex-1 overflow-y-auto overflow-x-auto">
            <div className="text-white bg-gray-900 bg-opacity-70 p-6">
                <h1 className="font-bold text-2xl">{boardsData?.title}</h1>
                <p className="font-bold text-sm text-gray-400">{boardsData?.description}</p>
            </div>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="board" direction="horizontal" type="stage">
                        {(provided) => (
                            <div className="flex items-baseline " style={{ width: 'calc(100vw - 200px)' }}>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex gap-4 p-4 opacity-95"
                                >
                                    {stages.map((stage, index) => (
                                        <Draggable key={`${stage.id}`} draggableId={stage.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-gray-900  w-[280px] p-4 rounded-3xl"
                                                    style={provided.draggableProps.style}
                                                >
                                                    <ColumnComponent stage={stage} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    <AddStageComponent />
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default BoardViewComponent;
