import { useGetStagesByBoardIdQuery } from "@/services/stages";
import { useCreateTaskMutation } from "@/services/tasks";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/shared/button";

interface IProps {
    stageId: string
}
const AddTaskComponent = (props: IProps) => {
    const router = useRouter();
    const { id } = router.query;
    const [isEditing, setIsEditing] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [createTask, { isLoading }] = useCreateTaskMutation()
    const { refetch: refetchStages } = useGetStagesByBoardIdQuery(id);

    async function handleSubmit() {
        if (taskName.trim()) {
            await createTask({
                title: taskName,
                stageId: props.stageId
            })
            setTaskName("");
            setIsEditing(false);
            refetchStages()
        }
    };

    const handleCancel = () => {
        setTaskName("");
        setIsEditing(false);
    };

    return (
        <div className="mb-2 w-full">
            {isEditing ? (
                <div className="bg-gray-700 p-2 rounded border opacity-90 border-gray-300 space-y-2">
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="Enter task name"
                        autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                        <Button
                            loading={isLoading}
                            onClick={handleSubmit}
                            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={handleCancel}
                            className="px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className="bg-gray-700 p-2 rounded cursor-pointer border-2 text-white text-sm border-dashed border-gray-100 text-center"
                    onClick={() => setIsEditing(true)}
                >
                    Add Task
                </div>
            )}
        </div>
    );
};

export default AddTaskComponent;
