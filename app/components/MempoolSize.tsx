import React from 'react';

interface MempoolSizeProps {
  txTypeCounts: {
    token_transfer: number;
    smart_contract: number;
    contract_call: number;
    poison_microblock: number;
  };
}

const MempoolSize = ({ txTypeCounts }: MempoolSizeProps) => {
  return (
    <div>
      <p>Pending Transactions</p>
      <p>
        {txTypeCounts.token_transfer +
          txTypeCounts.smart_contract +
          txTypeCounts.contract_call +
          txTypeCounts.poison_microblock}
      </p>
    </div>
  );
};

export default MempoolSize;
