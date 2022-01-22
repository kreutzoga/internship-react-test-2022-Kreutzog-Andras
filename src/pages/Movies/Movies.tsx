import React, {FC, useEffect, useState} from "react";
import Button from "../../components/button/Button";
import {Trash} from 'react-bootstrap-icons';
import {Pencil} from 'react-bootstrap-icons';
import {SortUp} from 'react-bootstrap-icons';
import {SortDown} from 'react-bootstrap-icons';
import {MOVIES} from "../../data/movies";
import {MovieModel} from "../../models/movie.model";
import {useHistory} from "react-router";

const Movies: FC = () => {
    const [movies, setMovies] = useState<MovieModel[]>(MOVIES);
    const [sortBy, setSortBy] = useState("Rating");
    const [sortType, setSortType] = useState("Desc");
    const [showInput, setShowInput] = useState(false);
    const [updateMovie, setUpdateMovie] = useState(movies[0]);
    const [selectedCard, setSelectedCard] = useState<number>();
    const {replace} = useHistory();

    const goToMoviesPage = () => {
        replace("/movies");
    };

    useEffect(() => {
        const sortArray = () => {
            switch (sortBy) {
                case "Rating": {
                    const sorted =
                        sortType === "Desc" ?
                            movies.sort((a, b) => b.rating - a.rating) :
                            movies.sort((a, b) => a.rating - b.rating);
                    setMovies(sorted);
                    break;
                }
                case "Year": {
                    const sorted =
                        sortType === "Desc" ?
                            movies.sort((a, b) => b.year - a.year) :
                            movies.sort((a, b) => a.year - b.year);
                    setMovies(sorted);
                    break;
                }
                case "Alphabetical": {
                    const sorted =
                        sortType === "Desc" ?
                            movies.sort((a, b) => b.title.localeCompare(a.title)) :
                            movies.sort((a, b) => a.title.localeCompare(b.title));
                    setMovies(sorted);
                    break;
                }
            }

            goToMoviesPage();
        };

        sortArray();
    }, [sortBy, sortType, movies]);

    const handleDeleteMovie = async (id: number) => {
        const index = movies.findIndex(el => el.id === id)
        movies.splice(index, 1);

        goToMoviesPage();
    };

    const handleUpdateMovie = async (newTitle: string) => {
        const index = movies.findIndex(el => el.id === updateMovie.id);
        movies[index].title = newTitle;

        goToMoviesPage();
    };

    const handleInputChange = () => {
        (document.querySelector<HTMLInputElement>('input[id="inputText"]')!.value === "") ?
            document.querySelector<HTMLInputElement>('button[id="sendButton"]')!.disabled = true :
            document.querySelector<HTMLInputElement>('button[id="sendButton"]')!.disabled = false;
    };

    const InputField = () => (
        <div>
            <form>
                <div><h6>Edit "{updateMovie.title}"</h6></div>
                <input className="p-2 w-75" id="inputText" defaultValue={updateMovie.title}
                       onChange={(event) => {
                           event.preventDefault();
                           handleInputChange();
                       }}
                />
                <Button className="btn btn-primary m-2"
                        id="sendButton"
                        onClick={(event) => {
                            event.preventDefault();
                            handleUpdateMovie(document.querySelector<HTMLInputElement>('input[id="inputText"]')!.value);
                            setSelectedCard(0);
                            setShowInput(false);
                        }}
                >
                    Save
                </Button>
            </form>
            <br/>
        </div>
    )

    return (
        <div className="card m-3 p-3">

            {showInput ? <InputField/> : null}
            <div><h6>Sort by</h6></div>
            <div>
                <select
                    className="p-2 w-75 rounded"
                    onChange={(e) => setSortBy(e.target.value)}>
                    <option value="Rating">Rating</option>
                    <option value="Alphabetical">Alphabetical</option>
                    <option value="Year">Year</option>
                </select>
                <Button className="btn btn-primary m-2"
                        onClick={(event) => {
                            event.preventDefault();
                            sortType === "Desc" ? setSortType("Asc") : setSortType("Desc");
                        }}
                >
                    {sortType === "Desc" ? <SortDown/> : <SortUp/>}
                </Button>
            </div>
            {movies.map((movie) => {
                return (
                    <div className="card p-3">
                        <div key={movie.id} className={selectedCard===movie.id ? "border border-primary" : "border-0"}>
                            <img
                                src={movie.thumbnail}
                                alt={movie.title}
                            />
                            <span className="p-4">{movie.id}. {movie.title} ({movie.year})</span>
                            <Button className="btn btn-primary float-end mt-3"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setShowInput(false);
                                        handleDeleteMovie(movie.id);
                                    }}
                            >
                                <Trash/>
                            </Button>
                            <Button className="btn btn-primary float-end m-3"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setShowInput(true);
                                        setUpdateMovie(movie);
                                        setSelectedCard(movie.id);
                                    }}
                            >
                                <Pencil/>
                            </Button>
                            <span className="float-end pt-4">{movie.rating}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Movies;