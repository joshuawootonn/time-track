/********************************************************************************
** Form generated from reading UI file 'employeeeditform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_EMPLOYEEEDITFORM_H
#define UI_EMPLOYEEEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QVBoxLayout>

QT_BEGIN_NAMESPACE

class Ui_EmployeeEditForm
{
public:
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout;
    QLabel *label;
    QLineEdit *name;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label_2;
    QLineEdit *pin;
    QPushButton *GenerateButton;
    QHBoxLayout *horizontalLayout_3;
    QCheckBox *admin;
    QCheckBox *active;
    QLabel *error;
    QHBoxLayout *horizontalLayout_4;
    QSpacerItem *horizontalSpacer;
    QPushButton *FinishButton;
    QPushButton *CancelButton;

    void setupUi(QDialog *EmployeeEditForm)
    {
        if (EmployeeEditForm->objectName().isEmpty())
            EmployeeEditForm->setObjectName(QStringLiteral("EmployeeEditForm"));
        EmployeeEditForm->resize(224, 203);
        verticalLayout = new QVBoxLayout(EmployeeEditForm);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        label = new QLabel(EmployeeEditForm);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout->addWidget(label);

        name = new QLineEdit(EmployeeEditForm);
        name->setObjectName(QStringLiteral("name"));

        horizontalLayout->addWidget(name);


        verticalLayout->addLayout(horizontalLayout);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label_2 = new QLabel(EmployeeEditForm);
        label_2->setObjectName(QStringLiteral("label_2"));

        horizontalLayout_2->addWidget(label_2);

        pin = new QLineEdit(EmployeeEditForm);
        pin->setObjectName(QStringLiteral("pin"));
        pin->setMaxLength(4);

        horizontalLayout_2->addWidget(pin);

        GenerateButton = new QPushButton(EmployeeEditForm);
        GenerateButton->setObjectName(QStringLiteral("GenerateButton"));

        horizontalLayout_2->addWidget(GenerateButton);


        verticalLayout->addLayout(horizontalLayout_2);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        admin = new QCheckBox(EmployeeEditForm);
        admin->setObjectName(QStringLiteral("admin"));

        horizontalLayout_3->addWidget(admin);

        active = new QCheckBox(EmployeeEditForm);
        active->setObjectName(QStringLiteral("active"));

        horizontalLayout_3->addWidget(active);


        verticalLayout->addLayout(horizontalLayout_3);

        error = new QLabel(EmployeeEditForm);
        error->setObjectName(QStringLiteral("error"));

        verticalLayout->addWidget(error);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_4->addItem(horizontalSpacer);

        FinishButton = new QPushButton(EmployeeEditForm);
        FinishButton->setObjectName(QStringLiteral("FinishButton"));

        horizontalLayout_4->addWidget(FinishButton);

        CancelButton = new QPushButton(EmployeeEditForm);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));

        horizontalLayout_4->addWidget(CancelButton);


        verticalLayout->addLayout(horizontalLayout_4);


        retranslateUi(EmployeeEditForm);

        QMetaObject::connectSlotsByName(EmployeeEditForm);
    } // setupUi

    void retranslateUi(QDialog *EmployeeEditForm)
    {
        EmployeeEditForm->setWindowTitle(QApplication::translate("EmployeeEditForm", "Dialog", Q_NULLPTR));
        label->setText(QApplication::translate("EmployeeEditForm", "Name:", Q_NULLPTR));
        label_2->setText(QApplication::translate("EmployeeEditForm", "Pin:", Q_NULLPTR));
        GenerateButton->setText(QApplication::translate("EmployeeEditForm", "Generate", Q_NULLPTR));
        admin->setText(QApplication::translate("EmployeeEditForm", "Admin", Q_NULLPTR));
        active->setText(QApplication::translate("EmployeeEditForm", "Active", Q_NULLPTR));
        error->setText(QString());
        FinishButton->setText(QApplication::translate("EmployeeEditForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("EmployeeEditForm", "Cancel", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class EmployeeEditForm: public Ui_EmployeeEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_EMPLOYEEEDITFORM_H
