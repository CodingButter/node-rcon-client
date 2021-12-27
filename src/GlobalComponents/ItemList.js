import React, { useState } from "react"
import {TextField,List,ListItem, Paper, Typography } from "@material-ui/core";
import Items from "../bin/MineCraftItems.json";
import "../bin/ListItems.css"
import { AppStore } from "bin/AppStore";
import { Prompt } from "react-router-dom/cjs/react-router-dom.min";
import stringSimilarity  from "string-similarity"
export default function ItemList({username}) {
  const [search,updateSearch] = useState("");
 const HandleGiveItem = (item)=>{
  const quantity =  prompt("Quantity")
  AppStore.sendCommand(`give ${AppStore.focusedPlayer} ${item} ${quantity}`);
  AppStore.updateFocusedPlayer(null);
 }

 const handleUpdateSearch = (value)=>{
   updateSearch(value);

 }
return (
  AppStore.showItems && (
    <Paper className="item-list-paper" style={{maxHeight: 200, overflow: 'auto'}}>
     <TextField
            variant="outlined"
            margin="normal"
            id="outlined-search"
            value={search}
            label="Search Item"
            name="itemSearch"
            onChange={({ target }) => {
              handleUpdateSearch(target.value,search);
            }}/>
      <List className="item-list" sx={{width:500,height:450}} cols={6} rowHeight={32}>
        {
          Items.filter(({name})=>name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
            <ListItem onClick={()=>{HandleGiveItem(item.id)}} className="icon-list-item" data-id={item.id} key={index}>
              <Typography>{item.name}</Typography>
              <div className="item-icon" style={{backgroundPositionX:`${item.x}px`,backgroundPositionY:`${item.y}px`}}></div>
            </ListItem>
          ))
        }
      </List>
  </Paper>
  )
)
}

