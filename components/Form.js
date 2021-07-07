const Form = () => {
    return (
        <form>
            <br></br>
            <label htmlFor="name">Quantity</label>
            <input id="name" name="name" type="text" placeholder="variant quantity" autoComplete="name" required />
            <button type="submit">Submit</button>
      </form>
    )
}

export default Form;