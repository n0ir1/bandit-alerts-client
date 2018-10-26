import Link from "next/link";
import { v4 } from "uuid";

const id = v4();

const Index = () => (
  <div>
    <Link href={{ pathname: "/form", query: { id } }}>
      <a>Form Page</a>
    </Link>
    <Link href={{ pathname: "alerts", query: { id } }}>
      <a>Alerts Page</a>
    </Link>
  </div>
);

export default Index;
