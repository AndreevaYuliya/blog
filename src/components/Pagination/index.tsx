import { ChangeEvent, FC, useEffect } from "react";
import { useSearchParams } from "react-router";

import { Pagination as MuiPagination } from "@mui/material";

import styles from "./styles";

type PaginationProps = {
  total: number;
  limit: number;
};

const Pagination: FC<PaginationProps> = (props) => {
  const { total, limit } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromParams = parseInt(searchParams.get("page") || "1", 10);

  const pageCount = Math.ceil(total / limit);

  useEffect(() => {
    if (!searchParams.get("page")) {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      setSearchParams(params);
    }
  }, [searchParams, setSearchParams]);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  return (
    <MuiPagination
      sx={styles.paginationContainer}
      count={pageCount}
      page={pageFromParams}
      onChange={handlePageChange}
    />
  );
};

export default Pagination;

