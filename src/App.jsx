import BannerComponent from "./Banner/BannerComponent";
import ChatBot from 'react-simple-chatbot';

const App = () => {
  return (
    <div>
      <BannerComponent />
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!',
            end: true,
          },
        ]}
        floating={true}
      />
    </div>
  );
};

export default App;
