import { ethers } from "ethers";
import { useEffect, useState } from "react";
import deploy from "./deploy";
import Escrow from "./Escrow";
import DeployEscrow from "./components/deploy-escrow";

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        setSigner(provider.getSigner());
      } catch (error) {}
    }

    getAccounts();
  }, [account]);

  const onDeployEscrowContract = async ({ beneficiary, arbiter, amount }) => {
    const escrowContract = await deploy(signer, arbiter, beneficiary, amount);

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      amount: amount.toString(),
    };

    setEscrows([...escrows, escrow]);
  };

  return (
    <>
      <header className="max-w-7xl w-full m-auto px-6 pt-3">
        <h1 className="text-xl md:text-2xl font-semibold">Escrow</h1>
      </header>
      <main className="max-w-7xl w-full m-auto mt-5 px-6">
        <DeployEscrow onDeployEscrowContract={onDeployEscrowContract} />
        <section className="mt-10">
          <h2 className="text-xl mb-5"> Escrow Contracts </h2>

          {escrows.length === 0 && (
            <p className="mt-3">No Escrow contracts created.</p>
          )}

          <div className="grid grid-cols-12 gap-3">
            {escrows.map((escrow) => (
              <div className="col-span-12 tablet:col-span-6">
                <Escrow key={escrow.address} {...escrow} signer={signer} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
