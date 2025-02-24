import { useState } from 'react';

export default function Player({ initname, symbol, isActive, onChangeName }) {
    const [ playerName, setPlayerName] = useState(initname);
    const [ isEditing, setIsEditing] = useState(false);

    function handleEditClick()
    {
        setIsEditing((edit) => !edit);
        
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleEditName(event)
    {
        setPlayerName(event.target.value);
    }

    let name = <span className="player-name">{playerName}</span>;

    if(isEditing)
    {
        name = <input type='text' required value={playerName} onChange={handleEditName}></input>
    }

return(
    <li className={ isActive ? 'active' : undefined}>
    <span className="player">
      {name}
    <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{ isEditing ? 'Save' : 'Edit'}</button>
  </li>
);
}