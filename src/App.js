import React from "react";
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";
import { ProjectsProvider, selectedProjectsProvider } from "./context";

export const App = () => (
  <selectedProjectsProvider>
    <ProjectsProvider>
      <div className="App">
        <Header />
        <Content />
      </div>
    </ProjectsProvider>
  </selectedProjectsProvider>
);

export default App;
