import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetBoardsQuery, useRemoveBoardMutation } from "@/services/boards";
import BoardModal from "./modal";
import Button from "../shared/button";

const BoardsComponent = () => {
    const router = useRouter();
    const { data, error, isLoading, refetch } = useGetBoardsQuery(null, { skip: router.isFallback });
    const [removeBoard] = useRemoveBoardMutation();
    const [boards, setBoards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);

    useEffect(() => {
        if (data) {
            setBoards(data);
        }
    }, [data]);

    function handleBoardClick(boardId: string) {
        router.push(`/boards/${boardId}`);
    }

    function handleDelete(e: any, id: string) {
        e.stopPropagation();
        const relatedTask = data.find((d: any) => d.id === id);
        if (relatedTask?._count?.stages) {
            refetch();
            return alert("Unable to delete this board. Please remove all associated data before deleting it.");
        }
        removeBoard(id);
    }

    function handleEdit(e: any, board: any) {
        e.stopPropagation();
        setSelectedBoard(board);
        setIsModalOpen(true);
    }

    const openModal = () => {
        setSelectedBoard(null);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    if (isLoading) return <p>Loading boards...</p>;
    if (error) return <p>Error fetching boards.</p>;

    return (
        <div className="p-6">
            <div className="flex flex-wrap gap-4">
                {boards.map((board: any) => (
                    <div
                        key={board.id}
                        className="relative w-[300px] h-[150px] bg-cover bg-center rounded-lg shadow-md flex items-end p-4 text-white font-bold cursor-pointer transition transform hover:scale-105 hover:bg-black hover:bg-opacity-50"
                        style={{ backgroundImage: `url(${board.imageUrl})` }}
                        onClick={() => handleBoardClick(board.id)}
                    >
                        <Button
                            onClick={(e) => handleEdit(e, board)}
                            className="absolute top-2 right-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm z-10"
                        >
                            ✎
                        </Button>
                        <Button
                            onClick={(e) => handleDelete(e, board.id)}
                            className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm z-10"
                        >
                            &times;
                        </Button>
                        {board.title} | Stages: {board?._count?.stages}
                    </div>
                ))}
                <Button
                    onClick={openModal}
                    className="w-[300px] h-[150px] bg-gray-800 text-white flex items-center justify-center rounded-lg shadow-md hover:bg-gray-700 transition transform hover:scale-105"
                >
                    + Add New Board
                </Button>
            </div>
            {isModalOpen && <BoardModal onClose={closeModal} board={selectedBoard} />}
        </div>
    );
};

export default BoardsComponent;