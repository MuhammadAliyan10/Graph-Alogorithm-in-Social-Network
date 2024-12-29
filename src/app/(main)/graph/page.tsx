"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ReactFlow = dynamic(
  () => import("reactflow").then((mod) => mod.ReactFlow),
  { ssr: false }
);
import "reactflow/dist/style.css";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export default function GraphPage() {
  const [nodes, setNodes] = useState([
    { id: "1", data: { label: "Facebook" }, position: { x: 250, y: 5 } },
    { id: "2", data: { label: "Google" }, position: { x: 100, y: 100 } },
    { id: "3", data: { label: "Instagram" }, position: { x: 400, y: 100 } },
    { id: "4", data: { label: "X" }, position: { x: 250, y: 200 } },
  ]);

  const [edges, setEdges] = useState([
    { id: "e1-2", source: "1", target: "3", animated: true },
    { id: "e2-3", source: "2", target: "3", animated: true },
    { id: "e3-4", source: "4", target: "2", animated: true },
  ]);

  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeGroup, setNewNodeGroup] = useState("");

  const addNode = () => {
    if (!newNodeName || !newNodeGroup) {
      alert("Please enter node name and group.");
      return;
    }

    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: newNodeName },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    const newEdge = {
      id: `e${nodes.length + 1}-${nodes.length + 2}`,
      source: `${nodes.length + 1}`,
      target: `${nodes.length + 2}`,
      animated: true,
    };

    setEdges((prevEdges) => [...prevEdges, newEdge]);

    setNewNodeName("");
    setNewNodeGroup("");
  };
  const onNodeContextMenu = (event: any, node: any) => {
    event.preventDefault();
    // Show context menu (edit/delete options)
  };

  const onNodeDragStop = (event: any, node: any) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id ? { ...n, position: node.position } : n
      )
    );
  };
  const customStyles = {
    node: {
      color: "text-muted-foreground ",
      borderRadius: "5px",
    },
    edge: {
      strokeWidth: 2,
    },
  };

  return (
    <div className="container my-10">
      <h5 className="text-muted-foreground text-4xl mb-4 font-bold">Graph</h5>

      <Card>
        <CardHeader>
          <CardTitle>Social Network Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: "500px" }}>
            <ReactFlow
              nodes={nodes.map((node) => ({
                ...node,
                style: customStyles.node,
              }))}
              edges={edges.map((edge) => ({
                ...edge,
                style: customStyles.edge,
              }))}
              onNodeDragStop={onNodeDragStop}
              onNodeContextMenu={onNodeContextMenu}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Node</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Node</DialogTitle>
                <DialogDescription>
                  Make sure to add correct node name and group name.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-4">
                <div className="flex justify-between items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    placeholder="Node Name"
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <Label htmlFor="nodeGroup" className="text-right">
                    Group
                  </Label>
                  <Input
                    placeholder="Group Name"
                    value={newNodeGroup}
                    onChange={(e) => setNewNodeGroup(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={addNode}>Save Node</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
