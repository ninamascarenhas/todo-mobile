import * as SQLite from "expo-sqlite";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

let db: SQLite.SQLiteDatabase | null = null;

export async function initDatabase() {
  if (Platform.OS === "web") {
    console.warn("SQLite não é suportado na web.");
    return;
  }

  try {
    db = await SQLite.openDatabaseAsync("tasks.db");
    console.log("Banco aberto:", db);

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        title TEXT NOT NULL,
        done INTEGER DEFAULT 0,
        date TEXT,
        icon TEXT
      );

       CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT,
    email TEXT,
    avatar TEXT
  );
    `);
  } catch (err) {
    console.error("Erro ao inicializar o banco:", err);
  }
}

type Task = {
  id: number;
  title: string;
  done: boolean;
  date: string;
  icon: string;
};

export async function addTodo(title: string, date: string, icon: string) {
  if (!db) return console.error("Banco não inicializado.");
  await db.runAsync(
    "INSERT INTO todos (title, date, icon, done) VALUES (?, ?, ?, ?)",
    title,
    date,
    icon,
    0
  );
}

export async function getTodos(): Promise<Task[]> {
    let attempts = 10;
    while (!db && attempts > 0) {
      await new Promise((res) => setTimeout(res, 50));
      attempts--;
    }
  
    if (!db) {
      console.error("❌ Banco de dados ainda não inicializado após tentativa.");
      return [];
    }
  
    try {
      const result = await db.getAllAsync("SELECT * FROM todos ORDER BY id DESC");
  
      return result.map((row: any) => ({
        id: row.id,
        title: row.title,
        done: row.done === 1,
        date: row.date || "",
        icon: row.icon || "tasks",
      }));
    } catch (err) {
      console.error("Erro ao recuperar tarefas:", err);
      return [];
    }
  }
  
  
export async function updateTodo(id: number, done: number, title?: string) {
  if (!db) return;
  if (title)
    await db.runAsync("UPDATE todos SET title = ? WHERE id = ?", title, id);
  await db.runAsync("UPDATE todos SET done = ? WHERE id = ?", done, id);
}

export async function deleteTodo(id: number) {
  if (!db) return;
  await db.runAsync("DELETE FROM todos WHERE id = ?", id);
}

export async function clearTodos() {
  if (!db) return;
  await db.runAsync("DELETE FROM todos");
}

export async function getUser(): Promise<{
    id: number;
    name: string;
    email: string;
    avatar: string;
  } | null> {
    if (!db) return null;
  
    try {
      const result = await db.getFirstAsync("SELECT * FROM user WHERE id = 1");
  
      const row = result as Partial<{
        id: number;
        name: string;
        email: string;
        avatar: string;
      }>;
  
      if (
        row &&
        typeof row.id === "number" &&
        typeof row.name === "string" &&
        typeof row.email === "string" &&
        typeof row.avatar === "string"
      ) {
        return row as {
          id: number;
          name: string;
          email: string;
          avatar: string;
        };
      }
  
      return null;
    } catch (err) {
      console.error("Erro ao carregar usuário:", err);
      return null;
    }
  }
  

  export async function saveUser(name: string, email: string, avatar: string) {
    if (!db) return console.error("Banco não inicializado");
  
    try {
      await db.runAsync("DELETE FROM user");
      await db.runAsync(
        "INSERT INTO user (id, name, email, avatar) VALUES (?, ?, ?, ?)",
        1,
        name,
        email,
        avatar
      );
      console.log("✅ Usuário salvo no banco.");
    } catch (err) {
      console.error("Erro ao salvar usuário:", err);
    }
  }


export async function scheduleDailyTaskReminder() {
  if (!db) return;

  const today = new Date().toISOString().split("T")[0];

  const result = await db.getAllAsync(
    "SELECT * FROM todos WHERE done = 0 AND date = ?",
    today
  );

  if (result.length > 0) {
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(9, 0, 0, 0); 

    if (scheduledTime <= now) {
      scheduledTime.setTime(now.getTime() + 60 * 1000); 
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📌 Você tem tarefas pendentes",
        body: `Você tem ${result.length} tarefa(s) para hoje.`,
      },
      trigger: scheduledTime as any,
    });
  }
}
