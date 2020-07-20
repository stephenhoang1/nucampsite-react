import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, FormGroup, Label, Input,
Modal, ModalHeader, ModalBody, Form,
 Row, Col, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length; 
// checks to make sure a value is recieved and has a length greater than 0
const maxLength = len => val => !val || (val.length <= len);

const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class CommentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            touched: {
                author: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleSubmit.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <div>
            <Button outline onClick={this.toggleModal}><i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={4}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                </Col>
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="text" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary" onSubmit={this.handleSubmit}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div> 
        )

    }
}
function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
function RenderComments({comments, addComment, campsiteId}){
        if(comments){
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments:</h4>
                    {comments.map((comment) => { 
                    return (
                    <div key={comment.id}>
                        <p>
                            {comment.text}
                            <br />
                            -- {comment.author}, {" "}
                            {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        }).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </div>
            );
        })}
            <CommentForm campsiteId={campsiteId} addComment={addComment} />
        </div>
            );
        }
    }
   function CampsiteInfo(props) {
            if (props.campsite) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <h2>{props.campsite.name}</h2>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <RenderCampsite campsite = {props.campsite} />
                            <RenderComments 
                                comments={props.comments}
                                addComment={props.addComment}
                                campsiteId={props.campsite.id} />
                                                                
                        </div >
                    </div>
                )
            }
            return <div />;
        }
//comment
export default CampsiteInfo;