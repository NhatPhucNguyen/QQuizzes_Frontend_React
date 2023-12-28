import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IPlayer } from "../../interfaces/app_interfaces";
import { customAxios } from "../../config/axiosConfig";
import { useLoaderData, useParams } from "react-router-dom";

type CustomProps = {
    style: "Detail" | "Simple";
};

const Container = styled.div``;
const Title = styled.h2`
    text-align: center;
`;
const Table = styled.table`
    margin: 1rem 0;
    width: 100%;
    border-collapse: collapse;
`;
const TableHead = styled.thead``;
const Header = styled.th``;
const TableBody = styled.tbody`
    text-align: center;
`;
const TableRow = styled.tr<{ $isPlayer?: boolean }>`
    background-color: ${(props) => props.$isPlayer && "#fcba03"};
`;
const TableData = styled.td``;
const LeaderBoard = ({ style }: CustomProps) => {
    const [players, setPlayers] = useState<IPlayer[]>();
    const userId = localStorage.getItem("userId");
    const { quizId } = useParams();
    useEffect(() => {
        const getTopPlayers = async () => {
            const limit = 7;
            if (quizId) {
                const response = await customAxios.get(
                    `/quizzes/${quizId}/play/playersParticipated?limit=${limit}`
                );
                setPlayers(response.data as IPlayer[]);
            }
        };
        void getTopPlayers();
    }, [quizId]);
    return (
        <Container>
            <Title>Leader Board</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <Header>Rank</Header>
                        <Header>Name</Header>
                        <Header>Point</Header>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players && (
                        <>
                            {players.map((player, index) => {
                                return (
                                    <TableRow key={player.userId} $isPlayer={player.userId === userId}>
                                        <TableData>#{index + 1}</TableData>
                                        <TableData>
                                            {player.displayName}
                                        </TableData>
                                        <TableData>
                                            {player.result.highestPoint}
                                        </TableData>
                                    </TableRow>
                                );
                            })}
                        </>
                    )}
                </TableBody>
            </Table>
        </Container>
    );
};

export default LeaderBoard;
