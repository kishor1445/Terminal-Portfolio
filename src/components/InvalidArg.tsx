import React from 'react';

interface InvalidArgsProps {
  cmd: string;
  cmd_args: string[];
}

const InvalidArgs: React.FC<InvalidArgsProps> = ({ cmd, cmd_args }) => {
  return (
    <div>
      <p className="error">Error: Invalid arg '{cmd_args}' passed to '{cmd}'</p>
    </div>
  );
};

export default InvalidArgs;
