import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Layout from "../../components/Layout";

class AlumnoHorario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnosHorario: [],
      pos: null,
      titulo: "AGREGAR HORARIO",
      id: 0,
      id_Alumnos: "",
      horario_ingreso: "",
      horario_salida: "",
      alumnos: [], // Nuevo estado para almacenar las ID y nombres de los alumnos
    };
    this.cambiarHIngreso = this.cambiarHIngreso.bind(this);
    this.cambiarHSalida = this.cambiarHSalida.bind(this);
    // luego de guardar
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);

    this.guardar = this.guardar.bind(this);
  }

  cambiarHIngreso(e) {
    console.log();
    this.setState({
      horario_ingreso: e.target.value,
    });
  }

  cambiarHSalida(e) {
    console.log();
    this.setState({
      horario_salida: e.target.value,
    });
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/alumno_horario/").then((res) => {
      console.log(res.data);
      this.setState({ alumnosHorario: res.data });
    });

    // Obtener las ID y nombres de los alumnos registrados
    axios.get("http://127.0.0.1:8000/alumno/").then((res) => {
      console.log(res.data);
      this.setState({ alumnos: res.data });
    });
  }

  // Metodos

  // mostrar punto 5
  mostrar(cod, index) {
    axios.get("http://127.0.0.1:8000/alumno_horario/" + cod).then((res) => {
      this.setState({
        pos: index,
        titulo: "Editar",
        id: res.data.id,
        id_Alumnos: res.data.id_Alumnos,
        horario_ingreso: res.data.horario_ingreso,
        horario_salida: res.data.horario_salida,
      });
    });
  }

  guardar(e) {
    e.preventDefault();
    const { id, id_Alumnos, horario_ingreso, horario_salida } = this.state;

    const datos = new FormData();
    datos.append("id_Alumnos", id_Alumnos);
    datos.append("horario_ingreso", horario_ingreso);
    datos.append("horario_salida", horario_salida);
    console.log(datos);

    const apiUrl = "http://127.0.0.1:8000"; // URL del servidor

    if (id > 0) {
      // Edición de un registro
      axios
        .put(`${apiUrl}/alumno_horario/${id}`, datos)
        .then((res) => {
          const alumnosHorario = [...this.state.alumnosHorario];
          alumnosHorario[this.state.pos] = res.data;
          this.setState({
            pos: null,
            titulo: "Nuevo",
            id: 0,
            id_Alumnos: "",
            horario_ingreso: "",
            horario_salida: "",
            alumnosHorario: alumnosHorario,
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
        .post(`${apiUrl}/alumno_horario/`, datos)
        .then((res) => {
          const alumnosHorario = [...this.state.alumnosHorario, res.data];
          this.setState({
            id: 0,
            id_Alumnos: "",
            horario_ingreso: "",
            horario_salida: "",
            alumnosHorario: alumnosHorario,
          });
        })
        .catch((error) => {
          console.log(error.toString());
          // Manejo de errores adecuado
          // Mostrar mensaje de error al usuario o registrar el error
        });
    }
  }

  eliminar(cod) {
    let rpta = window.confirm("Desea Eliminar?");
    if (rpta) {
      axios
        .delete("http://127.0.0.1:8000/alumno_horario/" + cod)
        .then((res) => {
          this.setState((prevState) => ({
            alumnosHorario: prevState.alumnosHorario.filter(
              (alumno_horario) => alumno_horario.id !== cod
            ),
          }));
        });
    }
  }

  render() {
    return (
      <>
        <Layout>
          <Container>
            <h1>{this.state.titulo}</h1>
            <Form onSubmit={this.guardar}>
              <Form.Control type="hidden" defaultValue={this.state.id} />
              <Form.Group className="mb-3">
                <Form.Label>Seleccione ID Alumno:</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.id_Alumnos}
                  onChange={(e) =>
                    this.setState({ id_Alumnos: e.target.value })
                  }
                >
                  <option value="">Seleccionar ID</option>
                  {this.state.alumnos.map((alumno) => (
                    <option key={alumno.id} value={alumno.id}>
                      {alumno.nombre} {alumno.apellido}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ingrese Horario de Ingreso:</Form.Label>
                <Form.Control
                  type="time"
                  value={this.state.horario_ingreso}
                  onChange={this.cambiarHIngreso}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ingrese Horario de Salida:</Form.Label>
                <Form.Control
                  type="time"
                  value={this.state.horario_salida}
                  onChange={this.cambiarHSalida}
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
                  <th>Alumno</th>
                  <th>Horario Ingreso</th>
                  <th>Horario Salida</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.alumnosHorario.map((alumnoHorario, index) => {
                  const alumno = this.state.alumnos.find(
                    (alumno) => alumno.id === alumnoHorario.id_Alumnos
                  );
                  return (
                    <tr key={alumnoHorario.id}>
                      <td>{alumnoHorario.id}</td>
                      <td>{alumno ? `${alumno.nombre} ${alumno.apellido}` : ''}</td>
                      <td>{alumnoHorario.horario_ingreso}</td>
                      <td>{alumnoHorario.horario_salida}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() =>
                            this.mostrar(alumnoHorario.id, index)
                          }
                        >
                          Editar
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => this.eliminar(alumnoHorario.id)}
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

export default AlumnoHorario;
