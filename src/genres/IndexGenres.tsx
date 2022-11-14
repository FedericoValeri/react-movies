import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoint";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import GenericList from "../utils/GenericList";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";
import { genreDTO } from "./genres.model";

export default function IndexGenres() {
  const [genres, setGenres] = useState<genreDTO[]>();
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  function loadData() {
    axios
      .get(urlGenres, {
        params: { page, recordsPerPage },
      })
      .then((response: AxiosResponse<genreDTO[]>) => {
        const headerValue: string =
          response.headers["totalamountofrecords"] !== undefined
            ? response.headers["totalamountofrecords"]
            : "";
        const totalAmountOfRecords = parseInt(headerValue, 10);
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        setGenres(response.data);
      });
  }

  async function deleteGenre(id: number) {
    await axios
      .delete(`${urlGenres}/${id}`)
      .then(() => {
        loadData();
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  return (
    <>
      <h3>Genres</h3>
      <Link className="btn btn-primary" to="/genres/create">
        Create
      </Link>
      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      />
      <Pagination
        currentPage={page}
        totalAmountOfPages={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />
      <GenericList list={genres}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr key={genre.id}>
                <td>
                  <Link
                    className="btn btn-info"
                    to={`/genres/edit/${genre.id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => customConfirm(() => deleteGenre(genre.id))}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
                </td>
                <td>{genre.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}
