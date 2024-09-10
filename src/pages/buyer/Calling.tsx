import { useParams } from "react-router-dom";

export default function Calling() {
  const { id } = useParams();
  console.log("🚀 ~ Calling ~ id:", id);
  return <div>Calling</div>;
}
