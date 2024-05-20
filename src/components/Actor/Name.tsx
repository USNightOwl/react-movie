interface Props {
  names?: string[]
}

const Name = ({ names }: Props) => {
  return names ? (
    <div className='mt-10 flex items-center flex-wrap justify-center gap-4'>
      {names.map((name, index) => (
        <span key={index} className='py-2 px-4 border-2 border-primary rounded-lg'>
          {name}
        </span>
      ))}
    </div>
  ) : null
}

export default Name