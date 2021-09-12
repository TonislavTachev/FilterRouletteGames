import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment, makeStyles, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";
import TurnedInOutlinedIcon from "@material-ui/icons/TurnedInOutlined";
import IconButton from "@material-ui/core/IconButton";

const Filter = ({
  areAllSelected,
  isNewSelected,
  isTopSelected,
  resetFilters,
  setNew,
  setTop,
  gameToSearch,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.iconHolder}>
        <IconButton className={classes.iconButton} onClick={resetFilters}>
          {areAllSelected ? (
            <AppsOutlinedIcon color="primary" />
          ) : (
            <AppsOutlinedIcon />
          )}
        </IconButton>
        <Typography>ALL</Typography>
      </div>
      <div
        className={classes.iconHolder}
        onClick={() => setNew((isNewSelected) => !isNewSelected)}
      >
        <IconButton className={classes.iconButton}>
          {isNewSelected ? (
            <TurnedInOutlinedIcon />
          ) : (
            <TurnedInNotOutlinedIcon />
          )}
        </IconButton>
        <Typography>NEW</Typography>
      </div>
      <div className={classes.iconHolder}>
        <IconButton
          className={classes.iconButton}
          onClick={() => setTop((isTopSelected) => !isTopSelected)}
        >
          {isTopSelected ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}
        </IconButton>
        <Typography>TOP</Typography>
      </div>
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        variant="outlined"
        name="searchGame"
        value={gameToSearch}
        onChange={onChange}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
          classes: {
            root: classes.input,
          },
        }}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper:{
      display:'flex'
  },
  input: {
    borderRadius: "30px",
    height: "50px",
  },
  iconHolder: {
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5px",
  },
  iconButton: {
    padding: "0px",
  },
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    color: "white",
    cursor: "pointer",
    marginRight: "10px",
    marginBottom: "10px",
  },
  image: {
    width: "240px",
    height: "290px",
    objectFit: "cover",
  },
  card_face: {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;",
  },
}));

export default Filter;
