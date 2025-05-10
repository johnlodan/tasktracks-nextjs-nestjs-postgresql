import { useCreateBoardMutation, useUpdateBoardMutation } from "@/services/boards";
import React, { useEffect, useState } from "react";
import Button from "../shared/button";

interface IProps {
    onClose: () => any;
    board?: any;
}

const imageOptions = ["https://images5.alphacoders.com/137/thumb-1920-1378909.png", "https://giffiles.alphacoders.com/215/215911.gif", "https://images.alphacoders.com/137/thumb-1920-1379010.png", "https://images7.alphacoders.com/468/thumb-1920-468458.jpg",
    "https://images5.alphacoders.com/133/thumb-1920-1338166.png", "https://images3.alphacoders.com/129/thumb-1920-1291095.jpg", "https://picfiles.alphacoders.com/465/thumb-1920-465893.jpg", "https://images6.alphacoders.com/585/thumb-1920-585291.jpg", "https://images7.alphacoders.com/133/thumb-1920-1337188.jpeg", "https://images5.alphacoders.com/135/thumb-1920-1358128.png", "https://images5.alphacoders.com/135/thumb-1920-1357819.jpeg", "https://images6.alphacoders.com/135/thumb-1920-1356770.jpeg", "https://images7.alphacoders.com/548/thumb-1920-548306.jpg"];


const BoardModal = (props: IProps) => {
    const [boardName, setBoardName] = useState(props.board?.title || "");
    const [description, setDescription] = useState(props.board?.description || "");
    const [imageUrl, setImageUrl] = useState(props.board?.imageUrl || "");
    const [error, setError] = useState("");
    const [createBoard, { isLoading: createLoading }] = useCreateBoardMutation();
    const [updateBoard, { isLoading: updateLoading }] = useUpdateBoardMutation();

    useEffect(() => {
        if (!props.board) {
            const randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)];
            setImageUrl(randomImage);
        }
    }, [props.board]);

    async function handleSubmit() {
        if (!boardName.trim() || !description.trim()) {
            setError("Board name and description are required.");
            return;
        }

        if (props.board) {
            await updateBoard({ id: props.board.id, title: boardName, description, imageUrl });
        } else {
            await createBoard({ title: boardName, description, imageUrl, userId: "0" });
        }

        props.onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[650px] m-4">
                <h2 className="text-lg font-bold mb-4 text-white">{props.board ? "Edit Board" : "Create a New Board"}</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />

                <textarea
                    placeholder="Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded w-full mb-4 h-20 resize-none"
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    readOnly
                    className="border p-2 rounded w-full mb-4 bg-gray-100 cursor-not-allowed"
                />

                <div className="flex flex-wrap gap-4 mb-2">
                    {imageOptions.map((img) => (
                        <img
                            key={img}
                            src={img}
                            alt="Board preview"
                            className={`w-24 h-24 rounded cursor-pointer border-[4px] object-cover ${imageUrl === img ? "border-blue-500" : "border-gray-300"
                                }`}
                            onClick={() => setImageUrl(img)}
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="flex justify-end gap-4">
                    <Button onClick={props.onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        Close
                    </Button>
                    <Button loading={createLoading || updateLoading} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={handleSubmit}>
                        {props.board ? "Update Board" : "Create Board"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BoardModal;