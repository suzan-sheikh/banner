import Another from "./Another/Another";
import BannerComponent from "./Banner/BannerComponent";


const App = () => {
  return (
    <div className="p-9">
      <BannerComponent/>     
      <Another/> 
    </div>
  );
};

export default App;