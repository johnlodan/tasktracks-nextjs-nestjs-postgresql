import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { useRemoveTaskMutation, useUpdateTaskMutation } from "@/services/tasks";
import { useRouter } from "next/router";
import { useGetStagesByBoardIdQuery } from "@/services/stages";
import Button from "@/components/shared/button";

interface ModalProps {
    task: { id: string; title: string; description: string };
    onClose: () => void;

}

const Modal = ({ task, onClose }: ModalProps) => {
    const router = useRouter();
    const { id } = router.query;

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const { refetch: refetchStages } = useGetStagesByBoardIdQuery(id);
    const [removeTask, { isLoading: removeLoading }] = useRemoveTaskMutation()
    const [updateTask, { isLoading: updateLoading }] = useUpdateTaskMutation()

    async function handleSave() {
        await updateTask({ id: task.id, title, description });
        refetchStages()
        onClose()
    };

    async function handleDelete() {
        await removeTask(task.id)
        refetchStages()
        onClose()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-[650px] m-4">
                <div className="flex justify-between items-center mb-4">
                    <div />
                    <Button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </div>

                <h1 className="font-bold text-white text-md">Title</h1>
                {isEditingTitle ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                        autoFocus
                        className="border p-2 rounded w-full"
                    />
                ) : (
                    <h2 className="text-sm font-bold cursor-pointer text-gray-300" onClick={() => setIsEditingTitle(true)}>
                        {title}
                    </h2>
                )}
                <h1 className="font-bold text-white text-md mt-6">Description</h1>
                {isEditingDescription ? (
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={() => setIsEditingDescription(false)}
                        onKeyDown={(e) => e.key === "Enter" && setIsEditingDescription(false)}
                        autoFocus
                        className="border p-2 rounded w-full mt-2"
                    />
                ) : (
                    <p className="mt-2 cursor-pointe text-sm font-bold text-gray-300" onClick={() => setIsEditingDescription(true)}>
                        {description || "Click to add a description..."}
                    </p>
                )}
                <div className="mt-4 flex justify-end gap-4">
                    <Button
                        loading={removeLoading}
                        onClick={() => handleDelete()}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                    <Button
                        loading={updateLoading}
                        onClick={handleSave}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faSave} /> Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;