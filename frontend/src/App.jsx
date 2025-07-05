import React, { useState } from "react";
import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import NavBar from './components/Main_Components/Navbar'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'

function App() {
  const [colorMode, setColorMode] = useState("light");

  return (
    <Box minH={"100vh"} bg={colorMode === "light" ? "gray.100" : "gray.900"}>
      <NavBar colorMode={colorMode} setColorMode={setColorMode} />
      <Routes>
        <Route path = "/" element={<HomePage/>} />
        <Route path = "/create" element={<CreatePage/>} />
      </Routes>

    </Box>
  )
}

export default App
