const AccordionItem = ({ title, body, isOpen, setIsOpen }) => {
  return (
    <div className="border border-black ">
      <div
        className="font-bold p-2 bg-slate-200 flex justify-between cursor-pointer"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <span>{title}</span>
        <span  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} >∨ </span>
      </div>
      {isOpen && <div className="p-2">{body}</div>}
    </div>
  );
};
export default AccordionItem;
