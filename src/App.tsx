import strings from "./assets/strings.json";
import Post from "./Post";

function App() {
  return (
    <div className="bg-stone-800 w-screen h-screen p-10">
      <div className="flex flex-wrap gap-4">
        {strings.map((text, index) => (
          <Post key={index} text={text} />
        ))}
      </div>
    </div>
  );
}

export default App;
