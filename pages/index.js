import Head from 'next/head'
import { getSession } from 'next-auth/react';
import Sidebar from "../components/Sidebar";
import React from "react";
import Center from "../components/Center";
import Search from "../components/Search";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    

    <main className="flex">
      <Sidebar/>
      <Center/>
    </main>

    <div className="sticky bottom-0">
      <Player/>
    </div>

    </div>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session 
    }
  }
}