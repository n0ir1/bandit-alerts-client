import Link from "next/link";

const id = "1335c669-9964-4018-ad4b-710e565c3137";

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
