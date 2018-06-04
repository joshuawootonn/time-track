/********************************************************************************
** Form generated from reading UI file 'employeeeditform.ui'
**
** Created by: Qt User Interface Compiler version 5.11.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_EMPLOYEEEDITFORM_H
#define UI_EMPLOYEEEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_EmployeeEditForm
{
public:
    QGridLayout *gridLayout_2;
    QWidget *bigwidger;
    QVBoxLayout *verticalLayout;
    QWidget *widget;
    QHBoxLayout *horizontalLayout;
    QLabel *label;
    QLineEdit *name;
    QWidget *widget_2;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_3;
    QComboBox *crew;
    QWidget *widget1;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label_2;
    QLineEdit *pin;
    QPushButton *GenerateButton;
    QWidget *widget2;
    QGridLayout *gridLayout;
    QCheckBox *admin;
    QCheckBox *current;
    QCheckBox *active;
    QLabel *error;
    QWidget *widget3;
    QHBoxLayout *horizontalLayout_4;
    QSpacerItem *horizontalSpacer;
    QPushButton *FinishButton;
    QPushButton *CancelButton;

    void setupUi(QDialog *EmployeeEditForm)
    {
        if (EmployeeEditForm->objectName().isEmpty())
            EmployeeEditForm->setObjectName(QStringLiteral("EmployeeEditForm"));
        EmployeeEditForm->resize(326, 311);
        EmployeeEditForm->setStyleSheet(QLatin1String("QDialog#EmployeeEditForm{\n"
"\n"
"background-color:#E8E8E8;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 16px;\n"
"color:#263544;\n"
"}\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E8E8E8;\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#D1D1D1;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#F4F9F6;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#F4F9F6;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
""
                        "\n"
"\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"\n"
"}\n"
"\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#FE938C;\n"
"\n"
"}\n"
"\n"
"QLineEdit,QTimeEdit,QDateEdit,QSpinBox,QDateTimeEdit{ \n"
"background-color:#FFFFFF;\n"
" border: 0px solid #D1D1D1;	\n"
"\n"
"}\n"
"QLineEdit:hover,QTimeEdit:hover,QDateEdit:hover,QSpinBox:hover,QDateTimeEdit:hover{ \n"
"background-color:#FFFFFF;\n"
" border: 1px solid #D1D1D1;	\n"
"}\n"
""));
        gridLayout_2 = new QGridLayout(EmployeeEditForm);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        bigwidger = new QWidget(EmployeeEditForm);
        bigwidger->setObjectName(QStringLiteral("bigwidger"));
        verticalLayout = new QVBoxLayout(bigwidger);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        widget = new QWidget(bigwidger);
        widget->setObjectName(QStringLiteral("widget"));
        horizontalLayout = new QHBoxLayout(widget);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        label = new QLabel(widget);
        label->setObjectName(QStringLiteral("label"));
        label->setMinimumSize(QSize(50, 0));

        horizontalLayout->addWidget(label);

        name = new QLineEdit(widget);
        name->setObjectName(QStringLiteral("name"));

        horizontalLayout->addWidget(name);


        verticalLayout->addWidget(widget);

        widget_2 = new QWidget(bigwidger);
        widget_2->setObjectName(QStringLiteral("widget_2"));
        horizontalLayout_3 = new QHBoxLayout(widget_2);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        label_3 = new QLabel(widget_2);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setMinimumSize(QSize(50, 0));
        label_3->setMaximumSize(QSize(50, 16777215));

        horizontalLayout_3->addWidget(label_3);

        crew = new QComboBox(widget_2);
        crew->setObjectName(QStringLiteral("crew"));
        crew->setEditable(true);

        horizontalLayout_3->addWidget(crew);


        verticalLayout->addWidget(widget_2);

        widget1 = new QWidget(bigwidger);
        widget1->setObjectName(QStringLiteral("widget1"));
        horizontalLayout_2 = new QHBoxLayout(widget1);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label_2 = new QLabel(widget1);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setMinimumSize(QSize(50, 0));

        horizontalLayout_2->addWidget(label_2);

        pin = new QLineEdit(widget1);
        pin->setObjectName(QStringLiteral("pin"));
        pin->setMaxLength(6);

        horizontalLayout_2->addWidget(pin);

        GenerateButton = new QPushButton(widget1);
        GenerateButton->setObjectName(QStringLiteral("GenerateButton"));

        horizontalLayout_2->addWidget(GenerateButton);


        verticalLayout->addWidget(widget1);

        widget2 = new QWidget(bigwidger);
        widget2->setObjectName(QStringLiteral("widget2"));
        gridLayout = new QGridLayout(widget2);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        admin = new QCheckBox(widget2);
        admin->setObjectName(QStringLiteral("admin"));

        gridLayout->addWidget(admin, 0, 0, 1, 1);

        current = new QCheckBox(widget2);
        current->setObjectName(QStringLiteral("current"));

        gridLayout->addWidget(current, 0, 1, 1, 1);

        active = new QCheckBox(widget2);
        active->setObjectName(QStringLiteral("active"));

        gridLayout->addWidget(active, 1, 0, 1, 1);


        verticalLayout->addWidget(widget2);

        error = new QLabel(bigwidger);
        error->setObjectName(QStringLiteral("error"));
        QSizePolicy sizePolicy(QSizePolicy::Minimum, QSizePolicy::Minimum);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(error->sizePolicy().hasHeightForWidth());
        error->setSizePolicy(sizePolicy);

        verticalLayout->addWidget(error);

        widget3 = new QWidget(bigwidger);
        widget3->setObjectName(QStringLiteral("widget3"));
        horizontalLayout_4 = new QHBoxLayout(widget3);
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_4->addItem(horizontalSpacer);

        FinishButton = new QPushButton(widget3);
        FinishButton->setObjectName(QStringLiteral("FinishButton"));
        FinishButton->setMinimumSize(QSize(100, 0));

        horizontalLayout_4->addWidget(FinishButton);

        CancelButton = new QPushButton(widget3);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));
        CancelButton->setMinimumSize(QSize(100, 0));

        horizontalLayout_4->addWidget(CancelButton);


        verticalLayout->addWidget(widget3);


        gridLayout_2->addWidget(bigwidger, 0, 0, 1, 1);

        QWidget::setTabOrder(name, pin);
        QWidget::setTabOrder(pin, FinishButton);
        QWidget::setTabOrder(FinishButton, CancelButton);
        QWidget::setTabOrder(CancelButton, GenerateButton);
        QWidget::setTabOrder(GenerateButton, admin);
        QWidget::setTabOrder(admin, current);

        retranslateUi(EmployeeEditForm);

        QMetaObject::connectSlotsByName(EmployeeEditForm);
    } // setupUi

    void retranslateUi(QDialog *EmployeeEditForm)
    {
        EmployeeEditForm->setWindowTitle(QApplication::translate("EmployeeEditForm", "Employee Edit", nullptr));
        label->setText(QApplication::translate("EmployeeEditForm", "Name:", nullptr));
        label_3->setText(QApplication::translate("EmployeeEditForm", "Crew: ", nullptr));
        label_2->setText(QApplication::translate("EmployeeEditForm", "Pin:", nullptr));
        GenerateButton->setText(QApplication::translate("EmployeeEditForm", "Generate", nullptr));
        admin->setText(QApplication::translate("EmployeeEditForm", "Admin", nullptr));
        current->setText(QApplication::translate("EmployeeEditForm", "Employed", nullptr));
        active->setText(QApplication::translate("EmployeeEditForm", "Clocked In", nullptr));
        error->setText(QString());
        FinishButton->setText(QApplication::translate("EmployeeEditForm", "Finish", nullptr));
        CancelButton->setText(QApplication::translate("EmployeeEditForm", "Cancel", nullptr));
    } // retranslateUi

};

namespace Ui {
    class EmployeeEditForm: public Ui_EmployeeEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_EMPLOYEEEDITFORM_H
