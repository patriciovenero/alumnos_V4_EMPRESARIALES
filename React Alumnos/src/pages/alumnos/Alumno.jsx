import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Layout from "../../components/Layout";

class Alumno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [],
      pos: null,
      titulo: "AGREGAR ALUMNO",
      id: 0,
      nombre: "",
      apellido: "",
      fecha_nacimiento: "",
      foto: "",
    };
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioApellido = this.cambioApellido.bind(this);
    this.cambioFecha = this.cambioFecha.bind(this);
    this.cambioFoto = this.cambioFoto.bind(this);
    // luego de guardar
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);

    this.guardar = this.guardar.bind(this);
  }

  cambioNombre(e) {
    console.log();
    this.setState({
      nombre: e.target.value,
    });
  }

  cambioApellido(e) {
    console.log();
    this.setState({
      apellido: e.target.value,
    });
  }

  cambioFecha(e) {
    this.setState({
      fecha_nacimiento: e.target.value,
    });
  }

  cambioFoto(e) {
    this.setState({
      foto: e.target.files[0],
    });
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/alumno/").then((res) => {
      console.log(res.data);
      this.setState({ alumnos: res.data });
    });
  }

  // Metodos

  // mostrar punto 5
  mostrar(cod, index) {
    axios.get("http://127.0.0.1:8000/alumno/" + cod).then((res) => {
      this.setState({
        pos: index,
        titulo: "Editar",
        id: res.data.id,
        nombre: res.data.nombre,
        apellido: res.data.apellido,
        fecha_nacimiento: res.data.fecha_nacimiento,
        foto: res.data.foto_url,
      });
    });
  }

  guardar(e) {
    e.preventDefault();
    const { id, nombre, apellido, fecha_nacimiento, foto } = this.state;

    if (!foto) {
      // Validación de la imagen
      console.log("Debe seleccionar una imagen");
      return;
    }

    const datos = new FormData();
    datos.append("nombre", nombre);
    datos.append("apellido", apellido);
    datos.append("fecha_nacimiento", fecha_nacimiento);
    datos.append("foto", foto);
    console.log(datos);

    const apiUrl = "http://127.0.0.1:8000"; // URL del servidor

    if (id > 0) {
      // Edición de un registro
      axios
        .put(`${apiUrl}/alumno/${id}`, datos)
        .then((res) => {
          const alumnos = [...this.state.alumnos];
          alumnos[this.state.pos] = res.data;
          this.setState({
            pos: null,
            titulo: "Nuevo",
            id: 0,
            nombre: "",
            apellido: "",
            fecha_nacimiento: "",
            foto: "",
            alumnos: alumnos,
          });
        })
        .catch((error) => {
          console.log(error.toString());
          // Manejo de errores adecuado
          // Mostrar mensaje de error al usuario o registrar el error
        });
    } else {
      // Nuevo registro
      axios
        .post(`${apiUrl}/alumno/`, datos)
        .then((res) => {
          const alumnos = [...this.state.alumnos, res.data];
          this.setState({
            id: 0,
            nombre: "",
            apellido: "",
            fecha_nacimiento: "",
            foto: "",
            alumnos: alumnos,
          });
        })
        .catch((error) => {
          console.log(error.toString());
          // Manejo de errores adecuado
          // Mostrar mensaje de error al usuario o registrar el error
        });
    }
  }

  // eliminar 7
  eliminar(cod) {
    let rpta = window.confirm("Desea Eliminar?");
    if (rpta) {
      axios.delete("http://127.0.0.1:8000/alumno/" + cod).then((res) => {
        this.setState((prevState) => ({
          alumnos: prevState.alumnos.filter((alumno) => alumno.id !== cod),
        }));
      });
    }
  }

  render() {
    return (
      <>
        <Layout>
          <Container>
            <h1 className="mt-4">{this.state.titulo}</h1>
            <Form onSubmit={this.guardar}>
              <Form.Control type="hidden" defaultValue={this.state.id} />
              <Form.Group className="mb-3">
                <Form.Label>Ingrese Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.nombre}
                  onChange={this.cambioNombre}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ingrese Apellido:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.apellido}
                  onChange={this.cambioApellido}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha:</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.fecha_nacimiento}
                  onChange={this.cambioFecha}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Foto:</Form.Label>
                <Form.Control
                  type="file"
                  defaultValue={this.state.foto}
                  onChange={this.cambioFoto}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                GUARDAR
              </Button>
            </Form>
            <hr />
          </Container>

          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Fecha</th>
                  <th>Foto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.alumnos.map((alumno, index) => {
                  return (
                    <tr key={alumno.id}>
                      <td>{alumno.id}</td>
                      <td>{alumno.nombre}</td>
                      <td>{alumno.apellido}</td>
                      <td>{alumno.fecha_nacimiento}</td>
                      <td>
                        <img
                          key={alumno.id}
                          src={`${alumno.foto}`}
                          alt="Foto de alumno"
                          className="img-thumbnail"
                        />
                      </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => this.mostrar(alumno.id, index)}
                          className="mr-2"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => this.eliminar(alumno.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
        </Layout>
      </>
    );
  }
}

export default Alumno;
