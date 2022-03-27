import { useState } from 'react';
import { nanoid } from 'nanoid';

export function useUniqId() {
  const [componentId] = useState(() => nanoid());

  return componentId;
}