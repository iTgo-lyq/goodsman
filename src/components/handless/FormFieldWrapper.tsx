'use client';
import React from 'react';

export default function FormFieldWrapper(props: any) {
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement<any>(child, { value: props.value, onChange: props.onChange });
    }
    return child;
  });

  return (
    <>
      <input type="hidden" name={props.name} value={props.value}></input>
      {childrenWithProps}
    </>
  );
}
