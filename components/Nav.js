import Link from "next/link";
import Access from "./Access";

export const Nav = () => (
  <>
    <Link href="/form">
      <a>Form Page</a>
    </Link>
    <Access>
      {({ userId }) => (
        <>
          <Link href="/alerts">
            <a>Alerts Page</a>
          </Link>
          <Link href={{ pathname: "/history", query: { id: userId } }}>
            <a>History Page</a>
          </Link>
        </>
      )}
    </Access>
  </>
);
