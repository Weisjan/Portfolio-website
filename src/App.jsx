import { useState } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  return <div className="text-center bg-amber-400">Hello world!</div>;
}
