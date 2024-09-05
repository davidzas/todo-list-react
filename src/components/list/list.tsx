import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ItemType } from "../../types/types";
import { Item } from "../item/item";

type ListProps = {
  items: ItemType[];
  deleteItem: (id: string) => void;
  markAsComplete: (id: string) => void;
};

export const List: React.FC<ListProps> = ({ items, deleteItem, markAsComplete }) => {
  return (
    <ul className="task-list">
      {items.map((item, index) => (
        <li key={index} className="list-item">
          <div className="item-details">
            <Item item={item} />
          </div>
          <div className="action-buttons">
            <button onClick={() => deleteItem(item.id)} className="btn-icon" aria-label="Delete">
              <FontAwesomeIcon icon={faTrash} />
            </button>
            {!item.isCompleted && (
              <button className="btn-icon complete-button" onClick={() => markAsComplete(item.id)} aria-label="Complete">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
