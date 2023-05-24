

const TextStructure = (props) => {

    


  return (<div className="border-b-4 mt-4" key={props.key}>
    <h2 className=" lg:p-4 text-center lg:text-4xl font-semibold  text-md text-gray-900">{props.title}</h2>
    <p className="indent-6 pt-3 font-medium">{props.content}</p>
    <br/>
  </div>)
}

export default TextStructure