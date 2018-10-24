import Link from "next/link";

const Index = () => (
  <div>
    <Link href="/form">
      <a>Form Page</a>
    </Link>
    <Link href="/alerts">
      <a>Alerts Page</a>
    </Link>
  </div>
);

export default Index;
