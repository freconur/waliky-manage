const Home = () => {
	return (
		<>
			<div className="m-5">
				<div className="border-4 border-blue-200 shadow p-3 rounded-xl">
					<h1 className="text-gray-600 text-2xl capitalize font-bold">bienvenido a waliky manage</h1>
					
					<p className="text-gray-500 text-lg mt-3">Aqui podras gestionar las ventas, existencias y productos del almacen de waliky store mediante waliky manage.</p>
					<div className="border-2 border-blue-100 rounded-lg pl-2 mt-5 shadow">
						<span className="text-sm text-green-500">usa las opciones de tu barra lateral izquierda para ir a las diferentes herramientas.</span>

					</div>

				</div>
			</div>
		</>
	)
}

export { Home }