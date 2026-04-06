import { useState } from "react";

export interface LogEntry {
  id: string;
  type: string;
  date: string;
  mileage: string;
  cost: string;
  notes: string;
  createdAt?: number;
}

const SEED: LogEntry[] = [
  {
    id: "1",
    type: "fuel",
    date: "2024-03-28",
    mileage: "87420",
    cost: "72.50",
    notes: "Full tank",
  },
  {
    id: "2",
    type: "oil",
    date: "2024-03-10",
    mileage: "87000",
    cost: "89.00",
    notes: "Synthetic 5W-30",
  },
  {
    id: "3",
    type: "service",
    date: "2024-02-15",
    mileage: "85000",
    cost: "220.00",
    notes: "Annual service",
  },
  {
    id: "4",
    type: "repair",
    date: "2024-01-20",
    mileage: "83500",
    cost: "340.00",
    notes: "Brake pads",
  },
];

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(SEED);
  const [isPro, setIsPro] = useState(false);

  // PRODUCTION: replace useState above with Firestore listener:
  // useEffect(() => {
  //   const uid = auth().currentUser?.uid;
  //   return firestore()
  //     .collection('users').doc(uid).collection('logs')
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(snap => setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as LogEntry))));
  // }, []);

  // PRODUCTION: replace isPro useState with RevenueCat check:
  // useEffect(() => {
  //   Purchases.getCustomerInfo().then(info => {
  //     setIsPro(!!info.entitlements.active['pro']);
  //   });
  // }, []);

  const addLog = (data: Omit<LogEntry, "id">) => {
    // PRODUCTION:
    // const uid = auth().currentUser?.uid;
    // firestore().collection('users').doc(uid).collection('logs')
    //   .add({ ...data, createdAt: firestore.FieldValue.serverTimestamp() });
    setLogs((prev) => [
      { ...data, id: Date.now().toString(), createdAt: Date.now() },
      ...prev,
    ]);
  };

  const editLog = (entry: LogEntry) => {
    // PRODUCTION:
    // const uid = auth().currentUser?.uid;
    // firestore().collection('users').doc(uid).collection('logs').doc(entry.id).update(entry);
    setLogs((prev) => prev.map((l) => (l.id === entry.id ? entry : l)));
  };

  const deleteLog = (id: string) => {
    // PRODUCTION:
    // const uid = auth().currentUser?.uid;
    // firestore().collection('users').doc(uid).collection('logs').doc(id).delete();
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  return { logs, isPro, setIsPro, addLog, editLog, deleteLog };
}
