import React from 'react';
import { getProviders, signIn} from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect } from "react";


function Login({ providers }) {
  

 return (
    <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
      
      <img 
        src="https://i.pinimg.com/originals/98/f8/41/98f841316d8fabbb2f2e630a6f5f0dcf.jpg"
        height={200}
        width={300}
        
        className="animate-pulse"
      />
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
            onClick={() => signIn(provider.id, {callbackUrl: '/' })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}


