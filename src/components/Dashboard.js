import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment, makeStyles, Typography } from "@material-ui/core";
import Filter from "./Filter";
const Dashboard = () => {
  const classes = useStyles();

  const [games, setGames] = useState([]);
  const [gameToSearch, setGameToSearch] = useState("");
  const [isTopSelected, setTop] = useState(false);
  const [isNewSelected, setNew] = useState(false);
  const [areAllSelected, setAll] = useState(false);
  const [searchedGames, setSearchedGames] = useState([]);

  const fetchData = async () => {
    try {
      let res = await axios.get("./games.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.data) {
        setGames(res.data);
        setSearchedGames(res.data);
      }
    } catch (error) {}
  };

  const onChange = ({ target }) => {
    setGameToSearch(target.value);
  };

  const filterGames = (
    stringGame,
    isTopSelected,
    isNewSelected,
    areAllSelected
  ) => {
    console.log(isTopSelected, isNewSelected, areAllSelected);
    if (isTopSelected) {
      let foundGames = baseFilter(stringGame).filter((game) => game.top);

      setSearchedGames(foundGames);
    }

    if (isNewSelected) {
      let foundGames = baseFilter(stringGame).filter((game) => game.new);

      setSearchedGames(foundGames);
    }

    if (areAllSelected) {
      let foundGames = baseFilter(stringGame);
      console.log(foundGames);
      setSearchedGames(foundGames);
    }

    if (isTopSelected && isNewSelected) {
      let foundGames = baseFilter(stringGame)
        .filter((game) => game.top)
        .filter((game) => game.new);

      setSearchedGames(foundGames);
    }

    if (!isTopSelected && !isNewSelected && !areAllSelected) {
      let foundGames = baseFilter(stringGame);

      setSearchedGames(foundGames);
    }
  };

  const baseFilter = (stringGame) => {
    return games.filter((game) => {
      return game.name.search(stringGame) !== -1;
    });
  };

  const resetFilters = () => {
    setAll((areAllSelected) => !areAllSelected);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterGames(gameToSearch, isTopSelected, isNewSelected, areAllSelected);

    if (areAllSelected) {
      setTop(false);
      setNew(false);
    }
  }, [gameToSearch, isTopSelected, isNewSelected, areAllSelected]);

  if (games !== null) {
    return (
      <div className={classes.mainWrapper}>
        <div className={classes.mainBar}>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title}>SLOTS</Typography>
          </div>
          <Filter
            areAllSelected={areAllSelected}
            isNewSelected={isNewSelected}
            isTopSelected={isTopSelected}
            resetFilters={resetFilters}
            setNew={setNew}
            setTop={setTop}
            gameToSearch={gameToSearch}
            onChange={onChange}
          />
        </div>
        <div className={classes.imageWrapper}>
          {searchedGames.map((el, key) => {
            return (
              <div key={key}>
                <div className={classes.card}>
                  <div className={classes.card_face}>
                    <img src={el.img_url} alt="" className={classes.image} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
  },
  mainBar: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "30px",
    justifyContent:'space-between',
    width:'93%',
    [theme.breakpoints.down('sm')]:{
        flexDirection:'column',
        width:'100%',
        alignItems:'center'

    }
  },
  titleWrapper:{
      marginLeft:'93px',
      [theme.breakpoints.down('sm')]:{
        marginLeft:'0px',
        display:'none'
    }
  },
  title:{
      fontSize:'25px',
      color:'#1976d2'
  },
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    cursor: "pointer",
    marginRight: "10px"
  },
  image: {
    width: "240px",
    objectFit: "contain",
  },
}));

export default Dashboard;
