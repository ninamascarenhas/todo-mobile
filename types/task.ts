import { Ionicons } from "@expo/vector-icons";
export type IconName = "book" | "brush" | "mail" | "document-text" | "folder" | "star";

export interface Task {
  id: number;
  title: string;
  done: boolean;
  date: string;
  icon: string;
}

export const iconColors: Record<IconName, string> = {
  book: "#F59E0B",  
  brush: "#10B981",         
  mail: "#3B82F6",        
  "document-text": "#FBBF24",
  folder: "#EF4444",         
  star: "#EC4899",          
};

export const mockTasks: Task[] = [
    {
      id: 1,
      title: "Comprar mantimentos",
      done: false,
      date: "Segunda-feira, 15 de maio",
      icon: "book",
    },
    {
      id: 2,
      title: "Passear com o cachorro",
      done: true,
      date: "Terça-feira, 16 de maio",
      icon: "brush",
    },
    {
      id: 3,
      title: "Enviar relatório",
      done: false,
      date: "Quarta-feira, 17 de maio",
      icon: "document-text",
    },
  ];

  type IconData = {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
  };
  

  export const iconData: IconData[] = [
    { name: "book", color: "#F59E0B" },
    { name: "brush", color: "#10B981" },
    { name: "mail", color: "#3B82F6" },
    { name: "document-text", color: "#FBBF24" },
    { name: "folder", color: "#EF4444" },
    { name: "star", color: "#EC4899" },
  ];