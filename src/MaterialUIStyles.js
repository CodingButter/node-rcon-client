import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default
  },
  root: {
    flexGrow: 1
  },
  paperPlate: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent:"space-evenly"
  },
  skinHeadContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    width: 80,
    height: 80,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
    display: "inherit",
    alignItems: "middle",
    justifyContent: "center",
    color: "#fff",
    backgroundColor: theme.palette.primary.light,
    padding: "8px",
    cursor: "pointer",
    textDecoration: "none"
  }
}));

export default useStyles;
