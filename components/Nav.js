import Link from "next/link";
import Access from "./Access";

export const Nav = () => (
  <>
    <Link href="/form">
      <a>Form Page</a>
    </Link>
    <Access>
      <>
        <Link href="/alerts">
          <a>Alerts Page</a>
        </Link>
        <Link href="/history">
          <a>History Page</a>
        </Link>
      </>
    </Access>
  </>
);
