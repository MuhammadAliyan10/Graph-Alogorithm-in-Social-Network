"use client";
import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  MarkerType,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface User {
  id: string;
  name: string;
  interests: string[];
}

interface CustomNode extends Node {
  data: {
    label: string;
  };
}

interface CustomEdge {
  label: string;
  markerEnd: {
    type: MarkerType;
  };
}

// Main App Component
const Page: React.FC = () => {
  const initialNodes: CustomNode[] = [
    {
      id: "1",
      data: { label: "Muhammad Aliyan" },
      position: { x: 0, y: 0 },
      type: "default",
    },
    {
      id: "2",
      data: { label: "Usama" },
      position: { x: 150, y: 100 },
      type: "default",
    },
    {
      id: "3",
      data: { label: "Zarar" },
      position: { x: 250, y: 150 },
      type: "default",
    },
  ];

  const initialEdges: CustomEdge[] = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      label: "Friend",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e1-3",
      source: "1",
      target: "3",
      label: "Friend",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  const mockUsers: User[] = [
    { id: "1", name: "Muhammad Aliyan", interests: ["Football", "Coding"] },
    { id: "2", name: "Usama", interests: ["Coding", "TikTok"] },
    { id: "3", name: "Zarar", interests: ["TikTok", "Gaming"] },
  ];

  // React Flow State
  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
  const [edges, setEdges] = useState<CustomEdge[]>(initialEdges);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Add New Connections Dynamically
  const onConnect = useCallback(
    (params: Edge) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      ),
    []
  );

  // Add New Node Dynamically
  const addNode = (name: string) => {
    const id = (nodes.length + 1).toString();
    const newNode: CustomNode = {
      id,
      data: { label: name },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Suggest Friends Based on Interests
  const suggestFriends = (currentUser: User): User[] => {
    return users.filter(
      (user) =>
        user.id !== currentUser.id &&
        user.interests.some((interest) =>
          currentUser.interests.includes(interest)
        )
    );
  };

  const handleUserClick = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    setSelectedUser(user);

    const suggestions = suggestFriends(user);
    console.log("Suggested Friends:", suggestions);

    suggestions.forEach((friend) => {
      if (!nodes.find((node) => node.id === friend.id)) {
        addNode(friend.name);
      }
      if (
        !edges.find((edge) => edge.source === id && edge.target === friend.id)
      ) {
        setEdges((prevEdges) => [
          ...prevEdges,
          {
            id: `e${id}-${friend.id}`,
            source: id,
            target: friend.id,
            label: "Suggested Friend",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
        ]);
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen container my-8 ">
      <div className="w-full lg:w-1/5 p-2 ">
        <div className="text-xl font-semibold my-6">Network Evolution</div>
        <div>
          <h4 className="text-lg font-medium mb-4 text-muted-foreground">
            Users
          </h4>
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-3 bg-muted shadow-md hover:bg-gray-100 cursor-pointer transition-all duration-300 text-muted-foreground"
                onClick={() => handleUserClick(user.id)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedUser && (
          <div className="mt-8">
            <h4 className="text-lg font-medium mb-4 ">Selected User</h4>
            <div className="p-4 bg-white rounded-xl shadow-md">
              <p className="text-sm text-gray-700">
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Interests:</strong> {selectedUser.interests.join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 h-full p-6">
        <Card className="h-full shadow-xl">
          <CardHeader>
            <div className="text-xl font-semibold">User Network</div>
          </CardHeader>
          <CardContent className="h-full">
            <ReactFlow
              nodes={nodes.map((node) => ({
                ...node,
                data: {
                  label: (
                    <Card className="p-2">
                      <CardHeader>
                        <div className="font-semibold text-md">
                          {node.data.label}
                        </div>
                      </CardHeader>
                      {/* <CardContent>
                        <div className="text-sm text-gray-500">
                          Interests: Football, Gaming
                        </div>
                      </CardContent> */}
                    </Card>
                  ),
                },
              }))}
              edges={edges}
              onNodesChange={(changes) =>
                setNodes((nds) => applyNodeChanges(changes, nds))
              }
              onEdgesChange={(changes) =>
                setEdges((eds) => applyEdgeChanges(changes, eds))
              }
              onConnect={onConnect}
              fitView
            ></ReactFlow>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
