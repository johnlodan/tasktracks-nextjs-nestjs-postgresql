import { useState } from "react";
import { useRouter } from "next/router";
import { useCreateStageMutation } from "@/services/stages";
import Button from "@/components/shared/button";

const AddStageComponent = () => {
    const router = useRouter();
    const [createStage, { isLoading }] = useCreateStageMutation()
    const { id } = router.query;

    const [isEditing, setIsEditing] = useState(false);
    const [stageName, setStageName] = useState("");

    async function handleSubmit() {
        await createStage({
            title: stageName,
            userId: "123",
            boardId: id
        })
        setStageName("")
        setIsEditing(false);
    }

    return (
        <div className="flex justify-center items-start w-[280px]">
            {!isEditing ? (
                <Button
                    className="bg-gray-700 p-2 rounded mb-2 text-sm cursor-pointer border-2 border-dashed border-gray-100 text-center w-full"
                    onClick={() => setIsEditing(true)}
                >
                    <h1 className="text-white">Add Another Stage</h1>
                </Button>
            ) : (
                <div className="bg-gray-700 p-2 rounded mb-2 border opacity-90 border-gray-300 flex flex-col items-center w-full">
                    <input
                        type="text"
                        value={stageName}
                        onChange={(e) => setStageName(e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                        placeholder="Enter stage name..."
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <Button
                            loading={isLoading}
                            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={() => { handleSubmit() }}
                        >
                            Submit
                        </Button>
                        <Button
                            className="px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddStageComponent;