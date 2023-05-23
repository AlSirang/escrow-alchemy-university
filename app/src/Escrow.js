import { ethers } from "ethers";
import escrowABI from "./artifacts/contracts/Escrow.sol/Escrow";
import { useEffect, useState } from "react";

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  amount,
  signer,
}) {
  const [isApproved, setIsApproved] = useState(false);

  const checkApproveStatus = async () => {
    try {
      const escrowContract = new ethers.Contract(
        address,
        escrowABI.abi,
        signer
      );

      setIsApproved(await escrowContract.isApproved());
    } catch (err) {
      setIsApproved(false);
    }
  };

  useEffect(() => {
    address && signer && checkApproveStatus();
  }, [signer, address]);

  const onApprove = async () => {
    try {
      const escrowContract = new ethers.Contract(
        address,
        escrowABI.abi,
        signer
      );
      const approveTxn = await escrowContract.connect(signer).approve();
      await approveTxn.wait();

      escrowContract.on("Approved", checkApproveStatus);
    } catch (err) {}
  };
  return (
    <div className="bg-gray-100 rounded-md shadow-md shadow-gray-100 border">
      <div className="py-8 px-6">
        <div className="grid gap-1">
          <div>
            <h2 className="font-semibold"> (Arbiter)</h2>
            <p>{arbiter}</p>
          </div>
          <div>
            <h2 className="font-semibold"> (Beneficiary)</h2>
            <p> {beneficiary} </p>
          </div>
          <div>
            <h2 className="font-semibold"> (Amount)</h2>
            <p> {ethers.utils.formatEther(amount || "0")} ETH</p>
          </div>
        </div>

        <div className="mt-5">
          {!isApproved && (
            <div className="max-w-xs m-auto ">
              <button
                onClick={onApprove}
                className="group relative flex w-full justify-center rounded-md bg-gray-900 transition-all py-1 px-2 text-md text-white hover:bg-gray-800"
              >
                Approve
              </button>
            </div>
          )}

          {isApproved && (
            <p className="text-green-800 font-semibold">
              ✓ It's been approved!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
