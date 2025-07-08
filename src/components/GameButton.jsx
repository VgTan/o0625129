const GameButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-full py-2 rounded-full bg-dark-orange overflow-hidden shadow-md border-[20px] border-dark-orange hover:scale-105 transition-transform duration-200"
    >
      {/* Lapisan atas transparan dengan gradasi */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-yellow-300 opacity-60" />
      {/* Teks */}
      <span className="relative z-10 font-bold text-orange *:tracking-wide font-baloo text-5xl">
        {children}
      </span>
    </button>
  );
};

export default GameButton;
