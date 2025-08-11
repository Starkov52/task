import React from 'react';

interface ChoiseListProps {
  data: any[];
  type?: string; // можно использовать, если нужно
  onSelect: (item: any) => void;
  selectedValue?: string;
}

const ChoiseList: React.FC<ChoiseListProps> = ({ data, onSelect, selectedValue }) => {
  const getDisplayName = (item: any) =>
    item.name ?? item.short_name ?? item.contragent_name ?? item.type ?? 'Без имени';

  return (
    <div className="choiseList" style={{ position: 'absolute',zIndex:'10',border: '1px solid #ccc', background: '#fff', maxHeight: 200, overflowY: 'auto' }}>
      {data.length === 0 && <p style={{ padding: 8, color: '#888' }}>Пусто</p>}
      {data.map((item, index) => {
        const name = getDisplayName(item);
        const isSelected = selectedValue === name;
        return (
          <p
            key={index}
            className={`choiseList__item`}
            style={{
              padding: '6px 12px',
              margin: 0,
              cursor: 'pointer',
              backgroundColor: isSelected ? '#eef' : 'transparent'
            }}
            onClick={() => onSelect(item)}
          >
            {name}
          </p>
        );
      })}
    </div>
  );
};

export default ChoiseList;
