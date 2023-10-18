import ReactPaginate from "react-paginate";
interface PaginationProps {
  pageCount: number;
  onPageChange: (value: number) => void;
}
const PaginationComponent = ({ pageCount, onPageChange }: PaginationProps) => {
  return (
    <>
      <div className="select-none hidden md:flex w-max m-auto">
        <ReactPaginate
          previousLabel={
            <svg
              width="7"
              height="10"
              viewBox="0 0 7 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.49829 1.05273L1.35355 5.0001L5.49829 8.94747"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          nextLabel={
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.04004 1.05273L5.18478 5.0001L1.04004 8.94747"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          breakLabel={
            <svg
              width="10"
              height="4"
              viewBox="0 0 10 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.44425" cy="1.944" r="1.35855" fill="#8C8FA7" />
              <circle cx="8.23697" cy="1.944" r="1.35855" fill="#8C8FA7" />
            </svg>
          }
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={({ selected }: { selected: number }) => onPageChange(selected)}
          containerClassName={"pagination flex items-center gap-[6px]"}
          activeClassName={"active"}
        />
      </div>
      <div className="select-none flex md:hidden">
        <ReactPaginate
          previousLabel={
            <svg
              width="7"
              height="10"
              viewBox="0 0 7 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.49829 1.05273L1.35355 5.0001L5.49829 8.94747"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          nextLabel={
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.04004 1.05273L5.18478 5.0001L1.04004 8.94747"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          breakLabel={
            <svg
              width="10"
              height="4"
              viewBox="0 0 10 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.44425" cy="1.944" r="1.35855" fill="#8C8FA7" />
              <circle cx="8.23697" cy="1.944" r="1.35855" fill="#8C8FA7" />
            </svg>
          }
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          onPageChange={({ selected }: { selected: number }) => onPageChange(selected)}
          containerClassName={"pagination flex items-center gap-[6px]"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default PaginationComponent;
